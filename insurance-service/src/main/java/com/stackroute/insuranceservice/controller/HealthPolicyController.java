package com.stackroute.insuranceservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.AddOnDetails;
import com.stackroute.insuranceservice.model.Benefits;
import com.stackroute.insuranceservice.model.Details;
import com.stackroute.insuranceservice.model.HealthInsurancePolicy;
import com.stackroute.insuranceservice.service.HealthInsurancePolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.Deflater;

@RestController
@RequestMapping("/api/v1")
public class HealthPolicyController {

    HealthInsurancePolicyService policyService;

    @Autowired
    public HealthPolicyController(HealthInsurancePolicyService policyService) {
        this.policyService = policyService;
    }

    @PostMapping("/policy")

    public ResponseEntity<?> addPolicy(@RequestBody HealthInsurancePolicy policy) {
        try
        {
            policyService.savePolicy(policy);
            return new ResponseEntity<>(policyService.savePolicy(policy),HttpStatus.ACCEPTED);
        }
        catch (PolicyAlreadyExistException e){
            e.getMessage();
            return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/policy")
    public ResponseEntity<?> getAllPolicies(){
        return new ResponseEntity<>(policyService.getAllPolicies(),HttpStatus.OK);
    }

    @GetMapping("/policyname/{policyName}")
    public ResponseEntity<?> getPolicyByPolicyName(@PathVariable String policyName){
        return new ResponseEntity<>(policyService.getPolicyByPolicyName(policyName),HttpStatus.OK);
    }

    @GetMapping("/policyid/{policyId}")
    public ResponseEntity<?> getPolicyByPolicyId(@PathVariable String  policyId) throws PolicyNotFoundException {
        return new ResponseEntity<>(policyService.getPolicyByPolicyId(policyId),HttpStatus.OK);
    }

    @DeleteMapping("/policy/delete/{policyId}")
    public ResponseEntity<?> deletePolicyByPolicyId(@PathVariable String policyId) throws PolicyNotFoundException {
        policyService.deletePolicyByPolicyId(policyId);
        return new ResponseEntity<>("Deleted successfully",HttpStatus.OK);
    }
}
