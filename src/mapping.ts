import { BigInt, log } from "@graphprotocol/graph-ts"

import {
    Execute,
    HumanityGovernance,
    Propose,
    RemoveVote,
    Terminate,
    Vote
} from "../generated/HumanityGovernance/HumanityGovernance"

import {
    Proposal,
    User,
    EntityVote
} from "../generated/schema"

export function handlePropose(event: Propose): void {
    let proposalID = event.params.proposalId
    let proposer = event.params.proposer
    let proposerID = proposer.toString()

    let proposal = Proposal.load (proposalID.toString())
    
    if (proposal == null) {
        proposal = new Proposal (proposalID.toString())

        proposal.result = "Pending"
        proposal.proposer = proposerID
        proposal.startTimestamp = event.block.timestamp
        proposal.yesCount = HumanityGovernance.bind (event.address).proposalFee()
        proposal.noCount = BigInt.fromI32 (0)
        proposal.isFinalized = false
        proposal.save()

        let user = User.load (proposerID)
        if (user == null) {
            user = new User (proposerID)
            user.save()
        }
    }
    else {
        log.warning ("This proposal already exists. ID {}", [proposalID.toString()])
    }
}

export function handleVote(event: Vote): void {
    let voterID = event.params.voter.toString()
    let proposalID = event.params.proposalId.toString()
    let proposal = Proposal.load (proposalID)

    if (proposal == null) {
        log.warning ("This proposal does not exist. ID {}", [proposalID])
    }
    else {
        let count = 0
        for (let v in proposal.votes) {
            let vote = EntityVote.load (v)
            if (vote != null && vote.voter == voterID) {
                count ++
            }
        }

        let voteID = proposalID.concat ("-").concat (voterID).concat ("-").concat (count.toString())
        let vote = new EntityVote (voteID)

        vote.voter = voterID
        vote.proposal = proposalID
        vote.timestamp = event.block.timestamp
        vote.option = event.params.approve ? "Yes" : "No"
        vote.weight = event.params.weight
        vote.removed = false

        vote.save()

        if (vote.option == "Yes") {
            proposal.yesCount = proposal.yesCount.plus (vote.weight)
        }
        else if (vote.option == "No") {
            proposal.noCount = proposal.noCount.plus (vote.weight)
        }

        proposal.save()

        let user = User.load (voterID)
        if (user == null) {
            user = new User (voterID)
            user.save()
        }
    }
    
}

export function handleRemoveVote(event: RemoveVote): void {
    let voterID = event.params.voter.toString()
    let proposalID = event.params.proposalId.toString()
    let proposal = Proposal.load (proposalID)

    if (proposal == null) {
        log.warning ("This proposal does not exist. ID {}", [proposalID])
    }
    else {
        for (let count = 0; count < proposal.votes.length; count++) {
            let voteID = proposalID.concat ("-").concat (voterID).concat ("-").concat (count.toString())
            let vote = EntityVote.load(voteID)

            if (vote != null) {
                vote.removed = true
                vote.save()

                if (vote.option == "Yes") {
                    proposal.yesCount = proposal.yesCount.minus (vote.weight)
                }
                else if (vote.option == "No") {
                    proposal.noCount = proposal.noCount.minus(vote.weight )
                }
                
                proposal.save()
            }
            else {
                break;
            }
        }
    }
}

export function handleExecute(event: Execute): void {
    let proposalID = event.params.proposalId.toString()
    let proposal = Proposal.load (proposalID)

    if (proposal != null) {
        proposal.result = "Yes"
        proposal.isFinalized = true
        proposal.save()
    }
    else {
        log.warning ("This proposal does not exist. ID {}", [proposalID])
    }
}


export function handleTerminate(event: Terminate): void {
    let proposalID = event.params.proposalId.toString()
    let proposal = Proposal.load (proposalID)

    if (proposal != null) {
        proposal.result = "No"
        proposal.isFinalized = true
        proposal.save()
    }
    else {
        log.warning ("This proposal does not exist. ID {}", [proposalID])
    }
}
