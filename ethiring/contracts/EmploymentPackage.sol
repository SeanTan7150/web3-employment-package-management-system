// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

contract EmploymentPackage {
    enum PackageType {
        Offer,
        Promotion,
        Resignation,
        Termination,
        ContractRenewal,
        SalaryIncrease,
        Bonus,
        Transfer,
        Warning,
        EmploymentVerification,
        JobDescription,
        TrainingCompletion,
        ProbationPeriodCompletion,
        LeaveApproval,
        Reference,
        Relocation,
        Retirement,
        EndOfContract,
        ChangeInEmploymentTerms
    }

    struct EmploymentDocument {
        address sender;
        address recipient;
        PackageType packageType;
        string documentHash;
        bytes employerSignature;
        bytes employeeSignature;
        uint256 createdOn;
        uint256 lastModified;
        uint256 expiry;
    }

    event DocumentAdded(
        address indexed sender,
        address indexed recipient,
        PackageType packageType,
        string documentHash,
        bytes signature
    );
    event DocumentSigned(uint256 indexed index, bytes signature);

    address public immutable _employer;
    mapping(uint256 => EmploymentDocument) private documents;
    uint256 public numberOfDocuments = 0;

    constructor() payable {
        _employer = msg.sender;
    }

    function addDocument(
        address _recipient,
        PackageType _packageType,
        string calldata _documentHash,
        bytes calldata _signature,
        uint256 _expiry
    ) public {
        address sender = msg.sender;

        if (sender == _employer) {
            // Employer cannot upload resignation or retirement letters
            require(
                _packageType != PackageType.Resignation,
                "Employer restricted"
            );
            require(
                _packageType != PackageType.Retirement,
                "Employer restricted"
            );
        } else {
            // Employee can only upload resignation or retirement letters
            require(
                _packageType == PackageType.Resignation ||
                    _packageType == PackageType.Retirement,
                "Employee restricted"
            );
        }

        EmploymentDocument storage newDocument = documents[numberOfDocuments];

        newDocument.sender = msg.sender;
        newDocument.recipient = _recipient;
        newDocument.packageType = _packageType;
        newDocument.documentHash = _documentHash;
        newDocument.employerSignature = sender == _employer
            ? _signature
            : bytes("");
        newDocument.employeeSignature = sender != _employer
            ? _signature
            : bytes("");
        newDocument.createdOn = block.timestamp;
        newDocument.lastModified = block.timestamp;
        newDocument.expiry = _expiry;

        ++numberOfDocuments;
        emit DocumentAdded(
            sender,
            _recipient,
            _packageType,
            _documentHash,
            _signature
        );
    }

    function signDocument(uint256 _index, bytes calldata _signature) public {
        require(_index < numberOfDocuments, "Invalid document index");

        address signer = msg.sender;
        EmploymentDocument storage doc = documents[_index];

        require(signer == doc.recipient, "Signer restricted");
        require(block.timestamp <= doc.expiry, "Package expired");

        if (signer == _employer) {
            require(
                doc.packageType == PackageType.Resignation ||
                    doc.packageType == PackageType.Retirement,
                "Employer restricted"
            );
            require(doc.employerSignature.length == 0, "Already signed");
            doc.employerSignature = _signature;
        } else {
            require(
                doc.packageType != PackageType.Resignation,
                "Employee restricted"
            );
            require(
                doc.packageType != PackageType.Retirement,
                "Employee restricted"
            );
            require(doc.employeeSignature.length == 0, "Already signed");
            doc.employeeSignature = _signature;
        }
        doc.lastModified = block.timestamp;
        emit DocumentSigned(_index, _signature);
    }

    function getDocuments() public view returns (EmploymentDocument[] memory) {
        EmploymentDocument[] memory allDocuments = new EmploymentDocument[](
            numberOfDocuments
        );
        for (uint i = 0; i < numberOfDocuments; i++) {
            EmploymentDocument storage doc = documents[i];
            allDocuments[i] = doc;
        }
        return allDocuments;
    }
}
