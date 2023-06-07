package service.impl;

import domain.Project;
import org.springframework.stereotype.Service;
import service.ProjectService;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Service
public class ProjectServiceimpl implements ProjectService {
    private Long projectId = 220034338L;
    private Map<Long, Project> projectMap = new HashMap<Long, Project>();

    {
        Project project = new Project();
        project.setId(projectId);
        project.setTitle("Demo rest api");
        project.setProjectManager("Muslima Salwat");
        project.setCoverPhotoURL("https://images-nassl-images-amazon.com");
        project.setProjectNumber(220034338L);
        project.setCost(736.87);
        project.setLocation("Accra");
        projectMap.put(project.getId(), project);
    }


    @Override
    public Collection<Project> findAll() {
        return projectMap.values();
    }

    @Override
    public Project findById(long id) {
        return projectMap.get(id);
    }

    @Override
    public Project save(Project project) {
        Long newProjectId = ++projectId;
        project.setId(newProjectId);
        projectMap.put(project.getId(), project);
        return projectMap.get(newProjectId);
    }

    @Override
    public Project update(Project project) {
        projectId = project.getId();
        if (projectMap.get(projectId) != null) {

        }
        return null;
    }

    @Override
    public Project deleteById(long id) {
        if (projectMap.get(id) != null) {
            return projectMap.remove(id);
        }
        return null;
    }
}