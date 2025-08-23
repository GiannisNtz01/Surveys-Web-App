package com.example.authdemo.repository; // Create a new package for repositories

import com.example.authdemo.model.Survey; // Import your Survey entity
import com.example.authdemo.model.Survey.SurveyStatus; // Import the inner enum
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // Import List
import java.util.Optional;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {

    /**
     * Finds surveys whose status is in the provided list of statuses.
     * Spring Data JPA automatically generates the query for this method name.
     *
     * @param statuses A list of SurveyStatus enums to filter by.
     * @return A list of surveys matching the given statuses.
     */
    List<Survey> findByStatusIn(List<SurveyStatus> statuses);
}
