// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./helpers/errors.sol";
import "./ImplBase.sol";

/**
@title Anyswap L2 Implementation.
@notice This is the L2 implementation, so this is used when transferring from
l2 to supported l2s or L1.
Called by the registry if the selected bridge is Anyswap bridge.
@dev Follows the interface of ImplBase.
@author Movr Network.
*/
interface ICBridge {
    /**
     * @notice Send a cross-chain transfer via the liquidity pool-based bridge.
     * NOTE: This function DOES NOT SUPPORT fee-on-transfer / rebasing tokens.
     * @param _receiver The address of the receiver.
     * @param _token The address of the token.
     * @param _amount The amount of the transfer.
     * @param _dstChainId The destination chain ID.
     * @param _nonce A number input to guarantee uniqueness of transferId. Can be timestamp in practice.
     * @param _maxSlippage The max slippage accepted, given as percentage in point (pip). Eg. 5000 means 0.5%.
     * Must be greater than minimalMaxSlippage. Receiver is guaranteed to receive at least (100% - max slippage percentage) * amount or the
     * transfer can be refunded.
     */
    function send(
        address _receiver,
        address _token,
        uint256 _amount,
        uint64 _dstChainId,
        uint64 _nonce,
        uint32 _maxSlippage // slippage * 1M, eg. 0.5% -> 5000
    ) external;

    function withdraw(
        bytes calldata _wdmsg,
        bytes[] calldata _sigs,
        address[] calldata _signers,
        uint256[] calldata _powers
    ) external;
}

contract CBridgeImplL2 is ImplBase, ReentrancyGuard {
    using SafeERC20 for IERC20;
    ICBridge public immutable bridge;

    /**
    @notice Constructor sets the router address and registry address.
    @dev anyswap v3 address is constant. so no setter function required.
    */
    constructor(ICBridge _bridge, address _registry)
    ImplBase(_registry)
    {
        bridge = _bridge;
    }

    /**
    @notice function responsible for calling cross chain transfer using anyswap bridge.
    @dev the token to be passed on to anyswap function is supposed to be the wrapper token
    address.
    @param _amount amount to be sent.
    @param _from sender address.
    @param _receiverAddress receivers address.
    @param _token this is the main token address on the source chain.
    @param _toChainId destination chain Id
    @param _data data contains the wrapper token address for the token
    */
    function outboundTransferTo(
        uint256 _amount,
        address _from,
        address _receiverAddress,
        address _token,
        uint256 _toChainId,
        bytes memory _data
    ) external payable override onlyRegistry nonReentrant {
        require(_token != NATIVE_TOKEN_ADDRESS, MovrErrors.TOKEN_NOT_SUPPORTED);
        require(msg.value == 0, MovrErrors.VALUE_SHOULD_BE_ZERO);
        uint32 _maxSlippage = abi.decode(_data, (uint32));
        IERC20(_token).safeTransferFrom(_from, address(this), _amount);
        IERC20(_token).safeIncreaseAllowance(address(bridge), _amount);
        bridge.send(_receiverAddress, _token, _amount, uint64(_toChainId), uint64(block.timestamp), _maxSlippage);
    }
}
