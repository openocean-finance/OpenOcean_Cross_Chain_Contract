// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/**
// @title Movr Regisrtry Contract.
// @notice This is the main contract that is called using fund movr.
// This contains all the bridge and middleware ids.
// RouteIds signify which bridge to be used.
// Middleware Id signifies which aggregator will be used for swapping if required.
*/
contract TestMock {
    function decodeData(bytes calldata _data) public view returns (uint32) {
        uint32 _maxSlippage = abi.decode(_data, (uint32));
        return _maxSlippage;
    }
}
