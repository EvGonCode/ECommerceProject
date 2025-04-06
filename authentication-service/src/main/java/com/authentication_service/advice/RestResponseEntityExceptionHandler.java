package com.authentication_service.advice;

import com.authentication_service.exception.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class RestResponseEntityExceptionHandler {
    @ExceptionHandler(DuplicateUserException.class)
    protected ResponseEntity<Object> handleDuplicateUser(RuntimeException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Object> handleUnexpectedException(Exception ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }


}
