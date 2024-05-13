package pl.lodz.p.it.ssbd2024.mok.dto;

import pl.lodz.p.it.ssbd2024.model.filtering.SearchCriteria;

import java.util.List;

public record FilteredUsersRequest(
        List<SearchCriteria> searchCriteriaList,
        String dataOption,
        List<String> roles
) {
}
