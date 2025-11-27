from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse

# TODO: Refactor these tests according to new design later.
# class UserViewSetTestCase(APITestCase):
#     def setUp(self):
#         # Set up a test client and create a user for testing
#         self.client = APIClient()
#         self.user_data = {'username': 'testuser',
#                           'password': 'testpass',
#                           'email': 'testuser@example.com'}
#         self.user = get_user_model().objects.create_user(**self.user_data)

#     def test_create_user(self):
#         """
#         Test that a new user can be created.
#         """
#         url = reverse('user-list')
#         data = {'username': 'newuser',
#                 'password': 'newpass',
#                 'email': 'newuser@example.com'}
#         response = self.client.post(url, data)

#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(get_user_model().objects.count(), 2)

#     def test_retrieve_user(self):
#         """
#         Test that a user can be retrieved by ID.
#         """
#         url = reverse('user-detail', args=[self.user.id])
#         response = self.client.get(url)

#         # Check that the response is HTTP 200 OK and includes the expected user
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['username'], self.user_data['username'])

#     def test_update_user(self):
#         """
#         Test that a user can be updated.
#         """
#         url = reverse('user-detail', args=[self.user.id])
#         data = {'username': 'updateduser',
#                 'password': 'updatedpass',
#                 'email': 'updateduser@example.com'}
#         response = self.client.put(url, data)

#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.user.refresh_from_db()
#         self.assertEqual(self.user.username, data['username'])

#     def test_delete_user(self):
#         """
#         Test that a user can be deleted.
#         """
#         url = reverse('user-detail', args=[self.user.id])
#         response = self.client.delete(url)

#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertEqual(get_user_model().objects.count(), 0)


# class LoginViewTestCase(APITestCase):
#     def setUp(self):
#         # Set up a test client and create a user for testing
#         self.client = APIClient()
#         self.user_data = {'username': 'testuser',
#                           'password': 'testpass',
#                           'email': 'testuser@example.com'}
#         self.user = get_user_model().objects.create_user(**self.user_data)

#         # Set the URL for the login endpoint
#         self.url = reverse('login')

#     def test_login_success(self):
#         """
#         Test successful login with valid credentials.
#         """
#         data = {'username': 'testuser',
#                 'password': 'testpass'}
#         response = self.client.post(self.url, data)

#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('token', response.data)
#         self.assertIn('user_id', response.data)

#     def test_login_missing_username(self):
#         """
#         Test login with missing username.
#         """
#         data = {'password': 'testpass'}
#         response = self.client.post(self.url, data)

#         # Check that the response is HTTP 400 BAD REQUEST
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

#     def test_login_missing_password(self):
#         """
#         Test login with missing password.
#         """
#         data = {'username': 'testuser'}
#         response = self.client.post(self.url, data)

#         # Check that the response is HTTP 400 BAD REQUEST
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

#     def test_login_invalid_credentials(self):
#         """
#         Test login with invalid credentials.
#         """
#         data = {'username': 'testuser',
#                 'password': 'wrongpass'}
#         response = self.client.post(self.url, data)

#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertNotIn('token', response.data)
#         self.assertNotIn('user_id', response.data)
