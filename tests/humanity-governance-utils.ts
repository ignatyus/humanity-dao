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
  let mockEvent = newMockEvent()
  let executeEvent = new Execute(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  )

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
  let mockEvent = newMockEvent()
  let proposeEvent = new Propose(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  )

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
  let mockEvent = newMockEvent()
  let removeVoteEvent = new RemoveVote(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  )

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
  let mockEvent = newMockEvent()
  let terminateEvent = new Terminate(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  )

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
  let mockEvent = newMockEvent()
  let voteEvent = new Vote(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  )

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
