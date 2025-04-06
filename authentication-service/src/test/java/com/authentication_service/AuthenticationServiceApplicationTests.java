package com.authentication_service;

import com.authentication_service.authentication.AuthenticationResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class AuthenticationServiceApplicationTests {

	private final MockMvc mockMvc;

	@Autowired
	public AuthenticationServiceApplicationTests(MockMvc mockMvc) {
		this.mockMvc = mockMvc;
	}

	@Test
	public void testRegisterUser() throws Exception {
		mockMvc
				.perform(MockMvcRequestBuilders.post("/registerUser").contentType("application/json")
						.content("{\"login\": \"RegisterTest\", \"password\": \"123\"}"))
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void testAuthenticateUser() throws Exception {
		mockMvc
				.perform(MockMvcRequestBuilders.post("/registerUser").contentType("application/json")
						.content("{\"login\": \"AuthUserTest\", \"password\": \"123\"}"));

		mockMvc
				.perform(MockMvcRequestBuilders.post("/authenticate").contentType("application/json")
						.content("{\"login\": \"AuthUserTest\", \"password\": \"123\"}"))
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void testUnAuthenticateUser() throws Exception {
		MvcResult result = mockMvc
				.perform(MockMvcRequestBuilders.post("/registerUser").contentType("application/json")
						.content("{\"login\": \"UnAuthUserTest\", \"password\": \"123\"}"))
				.andReturn();

		String responseContent = result.getResponse().getContentAsString();
		ObjectMapper objectMapper = new ObjectMapper();
		AuthenticationResponse authResponse = objectMapper.readValue(responseContent, AuthenticationResponse.class);

		String token = authResponse.getToken();
		mockMvc
				.perform(MockMvcRequestBuilders.post("/unauthenticate").contentType("application/json")
//						.header("authorization", "Bearer " + token)
						.content(String.format("{\"jwt\": \"%s\"}", token)))
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void testRegisterDuplicateUser() throws Exception {
		mockMvc
				.perform(MockMvcRequestBuilders.post("/registerUser").contentType("application/json")
						.content("{\"login\": \"RegisterDuplicate\", \"password\": \"123\"}"))
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isOk());

		mockMvc
				.perform(MockMvcRequestBuilders.post("/registerUser").contentType("application/json")
						.content("{\"login\": \"RegisterDuplicate\", \"password\": \"123\"}"))
				.andDo(MockMvcResultHandlers.print())
				.andExpect(MockMvcResultMatchers.status().isBadRequest())
				.andExpect(MockMvcResultMatchers.content().string("User RegisterDuplicate already exist"));
	}

}
