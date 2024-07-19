// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Employment {
    struct JobPost {
        address postedBy;
        string title;
        string workplace;
        string country;
        string state;
        string city;
        string postal;
        string addressLine1;
        string addressLine2;
        string employmentType;
        // description
        string descriptionAbout;
        string[] responsibilities;
        string[] requirements;
        uint256 salary;
        // benefits
        bool healthInsurance;
        bool retirementPlans;
        bool paidTimeOff;
        bool flexibleWorkSchedules;
        bool wellnessPrograms;
        bool lifeInsurance;
        bool disabilityInsurance;
        bool employeeAssistancePrograms;
        // perks
        bool stockOptionsOrEquity;
        bool performanceBonuses;
        bool remoteWorkOpportunities;
        bool professionalDevelopmentAndTraining;
        bool companySponsoredEventsAndActivities;
        bool freeOrSubsidizedMealsSnacks;
        bool onSiteAmenities;
        bool transportationBenefits;
        bool employeeDiscounts;
        bool flexibleSpendingAccounts;
        uint256 postedOn;
        address[] applicants;
        bool isAvailable;
    }

    struct Applicant {
        string firstName;
        string lastName;
        string email;
        string contact;
        string[] skills;
        string resume; // IPFS
        bool isHired;
        bool registered;
    }

    struct Employer {
        string firstName;
        string lastName;
        string company;
        string email;
        string contact;
        string website;
        bool registered;
    }

    mapping(address => Applicant) public applicants;
    mapping(address => Employer) public employers;
    mapping(uint256 => JobPost) public jobPosts;

    uint256 public numberOfJobs = 0;

    event ProfileCreated(address indexed id, string firstName, string lastName);

    function setEmployer(
        string memory _firstName,
        string memory _lastName,
        string memory _company,
        string memory _email,
        string memory _contact,
        string memory _website
    ) public {
        require(
            !employers[msg.sender].registered,
            "Employer already registered"
        );

        Employer storage employer = employers[msg.sender];
        employer.firstName = _firstName;
        employer.lastName = _lastName;
        employer.company = _company;
        employer.email = _email;
        employer.contact = _contact;
        employer.website = _website;
        employer.registered = true;

        emit ProfileCreated(msg.sender, _firstName, _lastName);
    }

    function setApplicant(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _contact,
        string[] memory _skills,
        string memory _resume
    ) public {
        require(
            !applicants[msg.sender].registered,
            "Applicant already registered"
        );

        Applicant storage applicant = applicants[msg.sender];
        applicant.firstName = _firstName;
        applicant.lastName = _lastName;
        applicant.email = _email;
        applicant.contact = _contact;
        applicant.skills = _skills;
        applicant.resume = _resume;
        applicant.registered = true;

        emit ProfileCreated(msg.sender, _firstName, _lastName);
    }

    function publishJob(
        string memory _title,
        string memory _workplace,
        string memory _country,
        string memory _state,
        string memory _city,
        string memory _postal,
        string memory _addressLine1,
        string memory _addressLine2,
        string memory _employmentType,
        string memory _descriptionAbout,
        string[] memory _responsibilities,
        string[] memory _requirements,
        uint256 _salary,
        bool _healthInsurance,
        bool _retirementPlans,
        bool _paidTimeOff,
        bool _flexibleWorkSchedules,
        bool _wellnessPrograms,
        bool _lifeInsurance,
        bool _disabilityInsurance,
        bool _employeeAssistancePrograms,
        bool _stockOptionsOrEquity,
        bool _performanceBonuses,
        bool _remoteWorkOpportunities,
        bool _professionalDevelopmentAndTraining,
        bool _companySponsoredEventsAndActivities,
        bool _freeOrSubsidizedMealsSnacks,
        bool _onSiteAmenities,
        bool _transportationBenefits,
        bool _employeeDiscounts,
        bool _flexibleSpendingAccounts
    ) public returns (uint256) {
        require(employers[msg.sender].registered, "Employer not registered");

        JobPost storage newJob = jobPosts[numberOfJobs];

        newJob.postedBy = msg.sender;
        newJob.title = _title;
        newJob.workplace = _workplace;
        newJob.country = _country;
        newJob.state = _state;
        newJob.city = _city;
        newJob.postal = _postal;
        newJob.addressLine1 = _addressLine1;
        newJob.addressLine2 = _addressLine2;
        newJob.employmentType = _employmentType;
        newJob.descriptionAbout = _descriptionAbout;
        newJob.responsibilities = _responsibilities;
        newJob.requirements = _requirements;
        newJob.salary = _salary;
        newJob.healthInsurance = _healthInsurance;
        newJob.retirementPlans = _retirementPlans;
        newJob.paidTimeOff = _paidTimeOff;
        newJob.flexibleWorkSchedules = _flexibleWorkSchedules;
        newJob.wellnessPrograms = _wellnessPrograms;
        newJob.lifeInsurance = _lifeInsurance;
        newJob.disabilityInsurance = _disabilityInsurance;
        newJob.employeeAssistancePrograms = _employeeAssistancePrograms;
        newJob.stockOptionsOrEquity = _stockOptionsOrEquity;
        newJob.performanceBonuses = _performanceBonuses;
        newJob.remoteWorkOpportunities = _remoteWorkOpportunities;
        newJob
            .professionalDevelopmentAndTraining = _professionalDevelopmentAndTraining;
        newJob
            .companySponsoredEventsAndActivities = _companySponsoredEventsAndActivities;
        newJob.freeOrSubsidizedMealsSnacks = _freeOrSubsidizedMealsSnacks;
        newJob.onSiteAmenities = _onSiteAmenities;
        newJob.transportationBenefits = _transportationBenefits;
        newJob.employeeDiscounts = _employeeDiscounts;
        newJob.flexibleSpendingAccounts = _flexibleSpendingAccounts;
        newJob.postedOn = block.timestamp;
        newJob.isAvailable = true;

        numberOfJobs++;
        return numberOfJobs - 1;
    }

    function applyJob(uint256 _id) public {
        require(applicants[msg.sender].registered, "Applicant not registered");
        JobPost storage job = jobPosts[_id];
        job.applicants.push(msg.sender);
    }

    function getApplicants(uint256 _id) public view returns (address[] memory) {
        return jobPosts[_id].applicants;
    }

    function getJobs() public view returns (JobPost[] memory) {
        JobPost[] memory allJobs = new JobPost[](numberOfJobs);
        for (uint i = 0; i < numberOfJobs; i++) {
            JobPost storage job = jobPosts[i];
            allJobs[i] = job;
        }
        return allJobs;
    }
}
