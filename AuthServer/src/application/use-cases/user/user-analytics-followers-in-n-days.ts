import GetUtils from "dynotxt-common-services/build/utils";
import followsRepositoryInterface from "../../repository/followsRepositoryInterface";

const caseUserAnalyticsFollowersInNDays = async (
  followsRepository: followsRepositoryInterface,
  utlsService: GetUtils,
  currentUserId: string,
  numberOfDaysAgo: number
) => {
  return await followsRepository.followersInLastNDays(currentUserId, numberOfDaysAgo);
};

export default caseUserAnalyticsFollowersInNDays;
