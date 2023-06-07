package service;

import domain.Project;
import java.util.Collection;


public interface ProjectService {
    Collection<Project> findAll();

    Project findById(long id);

    Project save(Project project);

    Project update(Project project);

    Project deleteById(long id);
}
