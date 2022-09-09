package com.stackroute.insuranceservice.service;

import com.stackroute.insuranceservice.exceptions.PolicyAlreadyExistException;
import com.stackroute.insuranceservice.exceptions.PolicyNotFoundException;
import com.stackroute.insuranceservice.model.HealthInsurancePolicy;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface HealthInsurancePolicyService {

    public HealthInsurancePolicy savePolicy(HealthInsurancePolicy policy,MultipartFile file) throws PolicyAlreadyExistException, IOException;

    public Iterable<HealthInsurancePolicy> getAllPolicies();

    public HealthInsurancePolicy getPolicyByPolicyName(String policyName);

    public Optional<HealthInsurancePolicy> getPolicyByPolicyId(Integer policyId) throws PolicyNotFoundException;

    public boolean deletePolicyByPolicyId(Integer policyId) throws PolicyNotFoundException;
}