"""The model for a feat."""
from django.db import models
from .abstracts import HasName, HasDescription, Modification
from .document import FromDocument


class Benefit(Modification):
    """This is the model for an individual benefit of a background."""

    background = models.ForeignKey('Background', on_delete=models.CASCADE)


class Background(HasName, HasDescription, FromDocument):
    """
    This is the model for a character background.

    Your character's background reveals where you came from, how you became
    an adventurer, and your place in the world.
    """

    @property
    def benefits(self):
        """Returns the set of benefits that are related to this feat."""
        return self.benefit_set

    class Meta:
        """To assist with the UI layer."""

        verbose_name_plural = "backgrounds"

