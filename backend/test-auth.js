// Test script to verify authentication endpoints
// Run this with: node test-auth.js
import { BASE } from "@/utils/baseURL";

import fetch from 'node-fetch';

const BASE_URL = BASE ;

async function testAuth() {
    console.log('🔧 Testing Authentication Endpoints...\n');

    // Test 1: Register a new user
    console.log('1. Testing user registration...');
    try {
        const registerResponse = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                mobileno: '1234567890',
                password: 'password123',
                cpassword: 'password123',
                role: 0
            })
        });

        const registerData = await registerResponse.json();
        console.log('Register Response:', registerData);
        console.log('✅ Registration test completed\n');
    } catch (error) {
        console.log('❌ Registration failed:', error.message);
    }

    // Test 2: Login with the registered user
    console.log('2. Testing user login...');
    try {
        const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123'
            })
        });

        const loginData = await loginResponse.json();
        console.log('Login Response:', loginData);
        
        if (loginData.success && loginData.token) {
            console.log('✅ Login successful! Token received');
            
            // Test 3: Access protected route
            console.log('\n3. Testing protected route access...');
            const meResponse = await fetch(`${BASE_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${loginData.token}`
                }
            });

            const meData = await meResponse.json();
            console.log('Protected Route Response:', meData);
            console.log('✅ Protected route access test completed');
        } else {
            console.log('❌ Login failed');
        }
    } catch (error) {
        console.log('❌ Login failed:', error.message);
    }

    console.log('\n🎉 Authentication testing completed!');
}

// Run the test
testAuth();
