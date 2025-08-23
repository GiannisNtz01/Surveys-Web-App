package com.example.authdemo.model;

import com.example.authdemo.converter.SurveyContentConverter;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

/**
 * Represents a survey in the application.
 *
 * This entity includes a primary key, a status, a title, a counter for how many times it has been answered,
 * and a list of questions and their values stored as a JSON string in the database.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "survey")
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "survey_id")
    private Long surveyId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private SurveyStatus status;

    @Column(name = "survey_title")
    private String surveyTitle;

    @Column(name = "times_answered", nullable = false)
    private Integer timesAnswered = 0;

    @Column(name = "survey_content", columnDefinition = "TEXT")
    @Convert(converter = SurveyContentConverter.class)
    private List<List<SurveyField>> surveyContent;

    @Column(name = "users_answered", columnDefinition = "TEXT")
    private String usersAnswered = "";


    /**
     * Enum to represent the possible states of a survey.
     */
    public enum SurveyStatus {
        NEW("new"),
        COMPLETE("complete");

        private final String value;

        SurveyStatus(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public static SurveyStatus fromValue(String text) {
            for (SurveyStatus b : SurveyStatus.values()) {
                if (b.value.equalsIgnoreCase(text)) {
                    return b;
                }
            }
            throw new IllegalArgumentException("No enum constant with value " + text);
        }
    }

    /**
     * Inner class to represent a single field within a survey.
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SurveyField {
        private String fieldId;
        private String name;
        private String value;
        private boolean sign;
    }
}
