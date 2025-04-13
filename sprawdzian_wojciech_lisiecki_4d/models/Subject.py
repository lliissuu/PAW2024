__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Lisiecki Wojciech 4D"
from .Teacher import Teacher

class Subject:
    def __init__(self, _id: int, name: str, teacher: Teacher):
        self._id = _id
        self.name = name
        self.teacher = teacher

    def __str__(self) -> str:
        return f"{self.name} {self.teacher}"
