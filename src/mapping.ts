import { BigInt } from "@graphprotocol/graph-ts"

import {
    Execute,
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
    let proposal = Proposal.load (event.params.proposalId.toString())
    proposal.result = "Pending"
    proposal.proposer = event.params.proposer.toString()
    proposal.startTimestamp = event.block.timestamp
    // proposal.yesCount = event
    proposal.noCount = BigInt.fromI32(0)
    proposal.isFinalized = false

    proposal.save()
}

export function handleVote(event: Vote): void {
    /*
    let vote = EntityVote.load(event.params.proposalId.toString() + event.params.voter.toString())
    
    if (vote != null) {
        let voter = User.load (event.params.voter.toHexString())
        vote.voter = voter.id
        vote.weight = event.params.weight
    }
    */
}

export function handleRemoveVote(event: RemoveVote): void {
    
}

export function handleExecute(event: Execute): void {
    /*
    let proposal = Proposal.load(event.params.proposalId.toString())

    if (proposal != null) {
        proposal.result = "True"
        proposal.save()
    }
    else {

    }
    */
}


export function handleTerminate(event: Terminate): void {
    
}

