import { SearchCriteria } from "./SearchCriteria";

export type UsersSearchCriteria = {
  dataOption: string;
  searchCriteriaList: SearchCriteria[];
  roles: string[];
};
