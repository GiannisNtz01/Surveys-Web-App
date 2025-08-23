package com.example.authdemo.converter;

import com.example.authdemo.model.Survey.SurveyField;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

/**
 * Converts a List<List<SurveyField>> object to a JSON string for database storage
 * and converts the JSON string back to the object when retrieved.
 */
@Converter
public class SurveyContentConverter implements AttributeConverter<List<List<SurveyField>>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Converts the entity attribute (List<List<SurveyField>>) to the database column type (String).
     */
    @Override
    public String convertToDatabaseColumn(List<List<SurveyField>> attribute) {
        if (attribute == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Could not convert survey content to JSON string", e);
        }
    }

    /**
     * Converts the database column value (String) to the entity attribute type (List<List<SurveyField>>).
     */
    @Override
    public List<List<SurveyField>> convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return Collections.emptyList();
        }
        try {
            TypeReference<List<List<SurveyField>>> typeRef = new TypeReference<>() {};
            return objectMapper.readValue(dbData, typeRef);
        } catch (IOException e) {
            throw new RuntimeException("Could not convert JSON string to survey content", e);
        }
    }
}
