import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  Execute,
  Propose,
  RemoveVote,
  Terminate,
  Vote
} from "../generated/HumanityGovernance/HumanityGovernance"

export function createExecuteEvent(proposalId: BigInt): Execute {
  let executeEvent = changetype<Execute>(newMockEvent())

  executeEvent.parameters = new Array()

  executeEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )

  return executeEvent
}

export function createProposeEvent(
  proposalId: BigInt,
  proposer: Address,
  target: Address,
  data: Bytes
): Propose {
  let proposeEvent = changetype<Propose>(newMockEvent())

  proposeEvent.parameters = new Array()

  proposeEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  proposeEvent.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  proposeEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )
  proposeEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return proposeEvent
}

export function createRemoveVoteEvent(
  proposalId: BigInt,
  voter: Address
): RemoveVote {
  let removeVoteEvent = changetype<RemoveVote>(newMockEvent())

  removeVoteEvent.parameters = new Array()

  removeVoteEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  removeVoteEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )

  return removeVoteEvent
}

export function createTerminateEvent(proposalId: BigInt): Terminate {
  let terminateEvent = changetype<Terminate>(newMockEvent())

  terminateEvent.parameters = new Array()

  terminateEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )

  return terminateEvent
}

export function createVoteEvent(
  proposalId: BigInt,
  voter: Address,
  approve: boolean,
  weight: BigInt
): Vote {
  let voteEvent = changetype<Vote>(newMockEvent())

  voteEvent.parameters = new Array()

  voteEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  voteEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  voteEvent.parameters.push(
    new ethereum.EventParam("approve", ethereum.Value.fromBoolean(approve))
  )
  voteEvent.parameters.push(
    new ethereum.EventParam("weight", ethereum.Value.fromUnsignedBigInt(weight))
  )

  return voteEvent
}
