package domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class Project {
    private long id;
    private String title;
    private String projectManager;
    private String coverPhotoURL;
    private long projectNumber;
    private Double cost;
    private String location;

}
