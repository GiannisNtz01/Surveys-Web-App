package com.example.authdemo.controller;

import com.example.authdemo.model.Survey;
import com.example.authdemo.model.Survey.SurveyField;
import com.example.authdemo.model.Survey.SurveyStatus;
import com.example.authdemo.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.nio.charset.StandardCharsets;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.IntSummaryStatistics;

class SurveyCreationRequest {
    private String surveyTitle;
    private List<List<SurveyField>> surveyContent;

    public String getSurveyTitle() {
        return surveyTitle;
    }

    public void setSurveyTitle(String surveyTitle) {
        this.surveyTitle = surveyTitle;
    }

    public List<List<SurveyField>> getSurveyContent() {
        return surveyContent;
    }

    public void setSurveyContent(List<List<SurveyField>> surveyContent) {
        this.surveyContent = surveyContent;
    }
}

class SurveyUpdateRequest {
    private String status;
    private String surveyTitle;
    private List<List<SurveyField>> surveyContent;
    private Integer timesAnswered;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSurveyTitle() {
        return surveyTitle;
    }

    public void setSurveyTitle(String surveyTitle) {
        this.surveyTitle = surveyTitle;
    }

    public List<List<SurveyField>> getSurveyContent() {
        return surveyContent;
    }

    public void setSurveyContent(List<List<SurveyField>> surveyContent) {
        this.surveyContent = surveyContent;
    }

    public Integer getTimesAnswered() {
        return timesAnswered;
    }

    public void setTimesAnswered(Integer timesAnswered) {
        this.timesAnswered = timesAnswered;
    }
}

class UserSurveyAnswer {
    private List<List<SurveyField>> userAnswers;

    public List<List<SurveyField>> getUserAnswers() {
        return userAnswers;
    }

    public void setUserAnswers(List<List<SurveyField>> userAnswers) {
        this.userAnswers = userAnswers;
    }
}

class FieldStatisticsResponse {
    private String fieldId;
    private String fieldName;
    private double average;
    private int min;
    private int max;

    public FieldStatisticsResponse(String fieldId, String fieldName, double average, int min, int max) {
        this.fieldId = fieldId;
        this.fieldName = fieldName;
        this.average = average;
        this.min = min;
        this.max = max;
    }

    public String getFieldId() {
        return fieldId;
    }

    public String getFieldName() {
        return fieldName;
    }

    public double getAverage() {
        return average;
    }

    public int getMin() {
        return min;
    }

    public int getMax() {
        return max;
    }
}

class SurveyStatsResponse {
    private double totalScore;
    private long totalQuestions;
    private List<FieldStatisticsResponse> fieldStatistics;

    public SurveyStatsResponse(double totalScore, long totalQuestions, List<FieldStatisticsResponse> fieldStatistics) {
        this.totalScore = totalScore;
        this.totalQuestions = totalQuestions;
        this.fieldStatistics = fieldStatistics;
    }

    public double getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(double totalScore) {
        this.totalScore = totalScore;
    }

    public long getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(long totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public List<FieldStatisticsResponse> getFieldStatistics() {
        return fieldStatistics;
    }

    public void setFieldStatistics(List<FieldStatisticsResponse> fieldStatistics) {
        this.fieldStatistics = fieldStatistics;
    }
}

@RestController
@RequestMapping("/api")
public class SurveyController {

    private static final Logger logger = LoggerFactory.getLogger(SurveyController.class);

    @Autowired
    private SurveyRepository surveyRepository;

    /**
     * Gets a single survey by its ID. Accessible to any authenticated user.
     *
     * @param id The ID of the survey to fetch.
     * @return ResponseEntity containing the Survey object or a 404 Not Found.
     */
    @GetMapping("/surveys/{id}")
    public ResponseEntity<Survey> getSurveyById(@PathVariable Long id) {
        Optional<Survey> surveyOptional = surveyRepository.findById(id);
        return surveyOptional.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // --- Admin Endpoints ---

    /**
     * Admin endpoint: Creates a new survey with an initial status of 'NEW'.
     * Accessible only by ADMIN role.
     *
     * @param request The request body containing the new survey's title and
     *                content.
     * @return The created Survey object with its generated ID.
     */
    @PostMapping("/admin/surveys")
    public ResponseEntity<Survey> createSurveyByAdmin(@RequestBody SurveyCreationRequest request) {
        Survey newSurvey = new Survey();
        newSurvey.setSurveyTitle(request.getSurveyTitle());

        List<List<SurveyField>> fieldsWithIds = new ArrayList<>();
        for (List<SurveyField> row : request.getSurveyContent()) {
            List<SurveyField> newRow = new ArrayList<>();
            for (SurveyField f : row) {
                f.setFieldId(UUID.randomUUID().toString());
                newRow.add(f);
            }
            fieldsWithIds.add(newRow);
        }

        newSurvey.setSurveyContent(fieldsWithIds);
        newSurvey.setStatus(SurveyStatus.NEW);
        newSurvey.setTimesAnswered(0);

        Survey savedSurvey = surveyRepository.save(newSurvey);
        return new ResponseEntity<>(savedSurvey, HttpStatus.CREATED);
    }

    /**
     * Admin endpoint: Fetches all surveys, regardless of their status.
     * Accessible only by ADMIN role.
     *
     * @return A list of all Survey objects.
     */
    @GetMapping("/admin/surveys")
    public ResponseEntity<List<Survey>> getAllSurveysForAdmin() {
        List<Survey> surveys = surveyRepository.findAll();
        return ResponseEntity.ok(surveys);
    }

    /**
     * Admin endpoint: Sets the status of a specific survey to 'COMPLETE'.
     * Accessible only by ADMIN role.
     *
     * @param id The ID of the survey to update.
     * @return ResponseEntity containing the updated Survey object or a 404 Not
     *         Found.
     */
    @PutMapping("/admin/surveys/{id}/complete")
    public ResponseEntity<Survey> completeSurveyByAdmin(@PathVariable Long id) {
        Optional<Survey> surveyOptional = surveyRepository.findById(id);
        if (surveyOptional.isPresent()) {
            Survey survey = surveyOptional.get();
            survey.setStatus(SurveyStatus.COMPLETE);
            Survey updatedSurvey = surveyRepository.save(survey);
            return ResponseEntity.ok(updatedSurvey);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Admin endpoint: Gets statistics (min, max, average) for each field in a
     * survey.
     * Accessible only by ADMIN role.
     *
     * @param id The ID of the survey to get statistics for.
     * @return ResponseEntity containing a list of FieldStatisticsResponse or a 404
     *         Not Found.
     */
    @GetMapping("/admin/surveys/{id}/stats")
    public ResponseEntity<SurveyStatsResponse> getSurveyStats(@PathVariable Long id) {
        Optional<Survey> surveyOptional = surveyRepository.findById(id);
        if (surveyOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Survey survey = surveyOptional.get();
        List<List<Survey.SurveyField>> content = survey.getSurveyContent();

        if (content == null || content.isEmpty()) {
            SurveyStatsResponse stats = new SurveyStatsResponse(0.0, 0L, new ArrayList<>());
            return ResponseEntity.ok(stats);
        }

        double totalSum = 0.0;
        long totalQuestions = 0;

        List<FieldStatisticsResponse> fieldStats = new ArrayList<>();

        for (List<Survey.SurveyField> row : content) {
            for (Survey.SurveyField field : row) {
                String value = field.getValue();
                List<Integer> fieldValues = new ArrayList<>();

                if (value != null && !value.isEmpty()) {
                    totalQuestions += value.length();

                    for (char c : value.toCharArray()) {
                        if (Character.isDigit(c)) {
                            int response = Character.getNumericValue(c);
                            fieldValues.add(response);

                            double scoreContribution;
                            if (field.isSign()) {
                                scoreContribution = response - 1;
                            } else {
                                scoreContribution = 5 - response;
                            }
                            totalSum += scoreContribution;
                        }
                    }
                }

                if (!fieldValues.isEmpty()) {
                    IntSummaryStatistics stats = fieldValues.stream().mapToInt(Integer::intValue).summaryStatistics();
                    double average = stats.getAverage();
                    int min = stats.getMin();
                    int max = stats.getMax();

                    fieldStats.add(new FieldStatisticsResponse(field.getFieldId(), field.getName(), average, min, max));
                } else {
                    fieldStats.add(new FieldStatisticsResponse(field.getFieldId(), field.getName(), 0, 0, 0));
                }
            }
        }

        double totalScore = 0.0;
        if (totalQuestions > 0) {
            totalScore = (totalSum / (totalQuestions * 4.0)) * 100.0;
        }

        SurveyStatsResponse response = new SurveyStatsResponse(totalScore, totalQuestions, fieldStats);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/surveys/{id}/export")
    public ResponseEntity<Resource> exportSurveyStatsAsCsv(@PathVariable Long id) {
        Optional<Survey> surveyOptional = surveyRepository.findById(id);
        if (surveyOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Survey survey = surveyOptional.get();
        List<List<Survey.SurveyField>> content = survey.getSurveyContent();
        if (content == null || content.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        double totalSum = 0.0;
        long totalQuestions = 0;
        StringBuilder csvBuilder = new StringBuilder();

        csvBuilder.append("Field ID,Field Name,Average Score,Min Score,Max Score\n");

        for (List<Survey.SurveyField> row : content) {
            for (Survey.SurveyField field : row) {
                String value = field.getValue();
                List<Integer> fieldValues = new ArrayList<>();

                if (value != null && !value.isEmpty()) {
                    totalQuestions += value.length();

                    for (char c : value.toCharArray()) {
                        if (Character.isDigit(c)) {
                            int response = Character.getNumericValue(c);
                            fieldValues.add(response);

                            double scoreContribution;
                            if (field.isSign()) {
                                scoreContribution = response - 1;
                            } else {
                                scoreContribution = 5 - response;
                            }
                            totalSum += scoreContribution;
                        }
                    }
                }

                if (!fieldValues.isEmpty()) {
                    IntSummaryStatistics stats = fieldValues.stream().mapToInt(Integer::intValue).summaryStatistics();
                    double average = stats.getAverage();
                    int min = stats.getMin();
                    int max = stats.getMax();

                    csvBuilder.append(field.getFieldId())
                            .append(",")
                            .append("\"").append(field.getName()).append("\"")
                            .append(",")
                            .append(String.format("%.4f", average))
                            .append(",")
                            .append(min)
                            .append(",")
                            .append(max)
                            .append("\n");
                } else {
                    csvBuilder.append(field.getFieldId())
                            .append(",")
                            .append("\"").append(field.getName()).append("\"")
                            .append(",")
                            .append("0.0000")
                            .append(",")
                            .append("0")
                            .append(",")
                            .append("0")
                            .append("\n");
                }
            }
        }

        double totalScore = 0.0;
        if (totalQuestions > 0) {
            totalScore = (totalSum / (totalQuestions * 4.0)) * 100.0;
        }

        csvBuilder.append("FINAL_SCORE,")
                .append("\"Final SUS Score\"")
                .append(",")
                .append(String.format("%.4f", totalScore))
                .append(",")
                .append("-")
                .append(",")
                .append("-")
                .append("\n");

        byte[] csvBytes = csvBuilder.toString().getBytes(StandardCharsets.UTF_8);
        ByteArrayResource resource = new ByteArrayResource(csvBytes);

        String filename = survey.getSurveyTitle().replaceAll("\\s+", "_") + "_sus_score.csv";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(resource);
    }

    // --- User Endpoints ---

    /**
     * User endpoint: Fetches surveys with 'NEW' status.
     * The `IN_PROGRESS` status no longer exists.
     * Accessible only by USER role.
     *
     * @return A list of surveys with 'NEW' status.
     */
    @GetMapping("/user/surveys")
    public ResponseEntity<List<Survey>> getNewSurveysForUser() {

        List<Survey> surveys = surveyRepository.findByStatusIn(Arrays.asList(SurveyStatus.NEW));

        return ResponseEntity.ok(surveys);
    }

    /**
     * User endpoint: Allows a user to answer a survey.
     * This updates the survey content by appending new values and increments the
     * timesAnswered counter.
     * Accessible only by USER role.
     *
     * @param id          The ID of the survey to answer.
     * @param userAnswers The request body containing the user's answers.
     * @return ResponseEntity containing the updated Survey object or a 404 Not
     *         Found.
     */
    @PostMapping("/user/surveys/{id}/answer")
    public ResponseEntity<Survey> submitSurveyAnswer(@PathVariable Long id, @RequestBody UserSurveyAnswer userAnswers) {

        Optional<Survey> surveyOptional = surveyRepository.findById(id);

        if (surveyOptional.isPresent()) {
            Survey survey = surveyOptional.get();
            List<List<SurveyField>> existingContent = survey.getSurveyContent();

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();

            String currentUsers = survey.getUsersAnswered();

            if (currentUsers == null || currentUsers.isEmpty()) {
                survey.setUsersAnswered(username);
            } else {
                survey.setUsersAnswered(currentUsers + "," + username);
            }

            for (List<SurveyField> userRow : userAnswers.getUserAnswers()) {
                for (SurveyField userField : userRow) {
                    for (List<SurveyField> existingRow : existingContent) {
                        for (SurveyField existingField : existingRow) {
                            if (existingField.getFieldId().equals(userField.getFieldId())) {
                                if (existingField.getValue() == null) {
                                    existingField.setValue(userField.getValue());
                                } else if (userField.getValue() != null) {
                                    existingField.setValue(existingField.getValue() + userField.getValue());
                                }
                            }
                        }
                    }
                }
            }

            survey.setTimesAnswered(survey.getTimesAnswered() + 1);

            try {
                Survey updatedSurvey = surveyRepository.save(survey);
                return ResponseEntity.ok(updatedSurvey);
            } catch (Exception e) {
                logger.error("Error saving survey with ID {}: {}", id, e.getMessage());
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            logger.warn("Survey with ID {} not found.", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/surveys/{id}/can-answer")
    public ResponseEntity<Boolean> canUserAnswer(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Optional<Survey> surveyOptional = surveyRepository.findById(id);
        if (surveyOptional.isPresent()) {
            Survey survey = surveyOptional.get();
            String usersAnswered = survey.getUsersAnswered();

            boolean canAnswer = (usersAnswered == null || !usersAnswered.contains(username));
            return ResponseEntity.ok(canAnswer);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /*
     * Endpoint to get the role of the currently logged-in user.
     * Accessible to any authenticated user.*
     * 
     * @return ResponseEntity containing the user's role.
     */

    @GetMapping("/role")
    public ResponseEntity<Map<String, String>> getUserRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }

        String role = authentication.getAuthorities()
                .stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("unknown");

        String username = authentication.getName();

        Map<String, String> response = new HashMap<>();
        response.put("username", username);
        response.put("role", role);

        return ResponseEntity.ok(response);
    }

}
