// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
// pragma experimental ABIEncoderV2;

// contract Employment {
//     struct JobPost {
//         address postedBy;
//         bytes encodedJobDetails;
//         uint256 postedOn;
//         bool isAvailable;
//         address[] applicants;
//     }

//     struct User {
//         bytes encodedUserDetails;
//         bytes encodedWorkExperiences;
//         uint256 registeredOn;
//         bool isRegistered;
//     }

//     mapping(address => User) public users;
//     mapping(uint256 => JobPost) public jobPosts;

//     uint256 public numberOfJobs = 0;

//     event ProfileCreated(address indexed id);
//     event JobPublished(uint256 jobId, address indexed postedBy);
//     event JobActivated(uint256 jobId);
//     event JobDeactivated(uint256 jobId);
//     event JobApplied(uint256 jobId, address indexed applicant);

//     modifier onlyRegisteredUser() {
//         require(users[msg.sender].isRegistered, "User not registered");
//         _;
//     }

//     modifier jobExists(uint256 _jobPostId) {
//         require(_jobPostId < numberOfJobs, "Job does not exist");
//         _;
//     }

//     function createUser(bytes calldata _encodedUserDetails) public {
//         require(!users[msg.sender].isRegistered, "User already registered");

//         User storage user = users[msg.sender];
//         user.registeredOn = block.timestamp;
//         user.encodedUserDetails = _encodedUserDetails;
//         user.isRegistered = true;

//         emit ProfileCreated(msg.sender);
//     }

//     function updateUserDetails(
//         bytes calldata _encodedUserDetails
//     ) public onlyRegisteredUser {
//         User storage user = users[msg.sender];
//         user.encodedUserDetails = _encodedUserDetails;
//     }

//     function updateUserWorkExperiences(
//         bytes calldata _encodedWorkExperiences
//     ) public onlyRegisteredUser {
//         User storage user = users[msg.sender];
//         user.encodedWorkExperiences = _encodedWorkExperiences;
//     }

//     function getUser(address userAddress) public view returns (User memory) {
//         require(users[userAddress].isRegistered, "User not registered");
//         return users[userAddress];
//     }

//     function publishJob(
//         bytes calldata _encodedJobDetails
//     ) public onlyRegisteredUser returns (uint256) {
//         JobPost storage jobPost = jobPosts[numberOfJobs];
//         jobPost.postedBy = msg.sender;
//         jobPost.postedOn = block.timestamp;
//         jobPost.encodedJobDetails = _encodedJobDetails;
//         jobPost.isAvailable = true;

//         numberOfJobs++;
//         emit JobPublished(numberOfJobs - 1, msg.sender);
//         return numberOfJobs - 1;
//     }

//     function activateJob(uint256 _jobPostId) public jobExists(_jobPostId) {
//         JobPost storage jobPost = jobPosts[_jobPostId];
//         require(
//             msg.sender == jobPost.postedBy,
//             "Only job poster can activate the job"
//         );
//         jobPost.isAvailable = true;
//         emit JobActivated(_jobPostId);
//     }

//     function deactivateJob(uint256 _jobPostId) public jobExists(_jobPostId) {
//         JobPost storage jobPost = jobPosts[_jobPostId];
//         require(
//             msg.sender == jobPost.postedBy,
//             "Only job poster can deactivate the job"
//         );
//         jobPost.isAvailable = false;
//         emit JobDeactivated(_jobPostId);
//     }

//     function applyJob(
//         uint256 _jobPostId
//     ) public onlyRegisteredUser jobExists(_jobPostId) {
//         JobPost storage jobPost = jobPosts[_jobPostId];
//         require(jobPost.isAvailable, "Job is not available");
//         jobPost.applicants.push(msg.sender);
//     }

//     function getJobApplicants(
//         uint256 _jobPostId
//     ) public view jobExists(_jobPostId) returns (address[] memory) {
//         return jobPosts[_jobPostId].applicants;
//     }

//     function getJobs() public view returns (JobPost[] memory) {
//         JobPost[] memory allJobs = new JobPost[](numberOfJobs);
//         for (uint i = 0; i < numberOfJobs; i++) {
//             JobPost storage job = jobPosts[i];
//             allJobs[i] = job;
//         }
//         return allJobs;
//     }
// }
