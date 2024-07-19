// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract EmploymentPackage {
    enum Type {
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
        uint256 id;
        Type docType;
        bytes encodedDocumentContent;
        uint256 timestamp;
        address employee;
        bool signedByEmployee;
        bool signedByEmployer;
    }

    event DocumentAdded(
        address indexed employee,
        Type indexed documentType,
        bytes encodedDocumentContent,
        uint timestamp
    );
    event DocumentSigned(
        address indexed employee,
        uint256 indexed documentId,
        address indexed signer,
        bool signedByEmployee,
        bool signedByEmployer
    );

    address public employer;
    mapping(address => EmploymentDocument[]) public employmentDocuments;
    address[] public employees;

    uint256 public numberOfDocs = 0;
    uint256 public nextDocumentId = 1;

    constructor() {
        employer = msg.sender;
    }

    function getEmployer() public view returns (address) {
        return employer;
    }

    function addDocument(
        address _employee,
        Type _docType,
        bytes calldata _encodedDocumentContent
    ) public {
        if (employmentDocuments[_employee].length == 0) {
            employees.push(_employee);
        }

        if (msg.sender == employer) {
            require(
                _docType != Type.Resignation && _docType != Type.Retirement,
                "Employer cannot add resignation or retirement documents"
            );

            EmploymentDocument
                memory newEmploymentDocument = EmploymentDocument({
                    id: nextDocumentId,
                    docType: _docType,
                    encodedDocumentContent: _encodedDocumentContent,
                    timestamp: block.timestamp,
                    employee: _employee,
                    signedByEmployee: false,
                    signedByEmployer: true
                });
            employmentDocuments[_employee].push(newEmploymentDocument);
            numberOfDocs++;
            nextDocumentId++;

            emit DocumentAdded(
                _employee,
                _docType,
                _encodedDocumentContent,
                block.timestamp
            );
        } else {
            require(
                _docType == Type.Resignation || _docType == Type.Retirement,
                "Employees can only add resignation or retirement documents"
            );

            EmploymentDocument
                memory newEmploymentDocument = EmploymentDocument({
                    id: nextDocumentId,
                    docType: _docType,
                    encodedDocumentContent: _encodedDocumentContent,
                    timestamp: block.timestamp,
                    employee: _employee,
                    signedByEmployee: true,
                    signedByEmployer: false
                });
            employmentDocuments[_employee].push(newEmploymentDocument);
            numberOfDocs++;
            nextDocumentId++;

            emit DocumentAdded(
                _employee,
                _docType,
                _encodedDocumentContent,
                block.timestamp
            );
        }
    }

    function signDocument(uint256 _documentId) public {
        address signer = msg.sender;
        bool found = false;

        for (uint256 i = 0; i < employmentDocuments[signer].length; i++) {
            if (employmentDocuments[signer][i].id == _documentId) {
                EmploymentDocument storage doc = employmentDocuments[signer][i];
                if (signer == employer) {
                    require(
                        !doc.signedByEmployer,
                        "Document already signed by employer"
                    );
                    doc.signedByEmployer = true;
                } else {
                    require(
                        !doc.signedByEmployee,
                        "Document already signed by employee"
                    );
                    doc.signedByEmployee = true;
                }
                found = true;
                emit DocumentSigned(
                    doc.employee,
                    _documentId,
                    signer,
                    doc.signedByEmployee,
                    doc.signedByEmployer
                );
                break;
            }
        }
        require(found, "Document not found");
    }

    function getEmploymentDocuments(
        address _employee
    ) public view returns (EmploymentDocument[] memory) {
        return employmentDocuments[_employee];
    }

    function getAllEmploymentDocuments()
        public
        view
        returns (EmploymentDocument[] memory)
    {
        EmploymentDocument[]
            memory allEmploymentDocuments = new EmploymentDocument[](
                numberOfDocs
            );

        uint256 index = 0;
        for (uint256 i = 0; i < employees.length; i++) {
            address employee = employees[i];
            EmploymentDocument[] memory docs = employmentDocuments[employee];
            for (uint256 j = 0; j < docs.length; j++) {
                allEmploymentDocuments[index] = docs[j];
                index++;
            }
        }
        return allEmploymentDocuments;
    }
}
