package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/highlights")
@CrossOrigin(origins = "*")
public class HighlightController {

    @Autowired
    private PdfHighlightRepository repository;

    @GetMapping("/{caseId}")
    public List<PdfHighlight> getHighlights(
            @PathVariable Long caseId
    ) {

        return repository.findByCaseId(
                caseId
        );
    }
}