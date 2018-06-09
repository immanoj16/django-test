from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from .models import Expenselist
from django.contrib.auth.models import User


class ModelTestCase(TestCase):
    """This class defines the test suite for the expenselist model."""

    def setUp(self):
        """Define the test client and other test variables."""
        user = User.objects.create(username="nerd")
        self.name = "Sprite"
        # specify owner of a expenselist
        self.expenselist = Expenselist(name=self.name, owner=user)

    def test_model_can_create_a_expenselist(self):
        """Test the expenselist model can create a bucketlist."""
        old_count = Expenselist.objects.count()
        self.expenselist.save()
        new_count = Expenselist.objects.count()
        self.assertNotEqual(old_count, new_count)

    def test_model_returns_readable_representation(self):
        """Test a readable string is returned for the model instance."""
        self.assertEqual(str(self.expenselist), self.name)
