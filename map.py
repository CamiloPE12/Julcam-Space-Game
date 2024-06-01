import pygame
import random

class GameMap:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.areas = self.generate_areas()
        self.enemies = []
        self.items = []

    def generate_areas(self):
        areas = []
        for i in range(5):
            area = {
                "x": random.randint(0, self.width),
                "y": random.randint(0, self.height),
                "width": random.randint(50, 100),
                "height": random.randint(50, 100)
            }
            areas.append(area)
        return areas

    def update(self, hero, enemies, traps, treasures):
        # Mantener al héroe dentro de los límites del mapa
        if hero.rect.left < 0:
            hero.rect.left = 0
        if hero.rect.right > self.width:
            hero.rect.right = self.width
        if hero.rect.top < 0:
            hero.rect.top = 0
        if hero.rect.bottom > self.height:
            hero.rect.bottom = self.height

    def draw(self, screen):
        # Ya no dibujamos las áreas
        pass

class Star:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.speed = random.randint(1, 3)
        self.color = (255, 255, 255)  # Color blanco para las estrellas

    def update(self):
        self.y += self.speed
        if self.y > 600:  # Si la estrella sale de la pantalla, la reiniciamos en la parte superior
            self.y = 0
            self.x = random.randint(0, 800)
            self.speed = random.randint(1, 3)

    def draw(self, screen):
        pygame.draw.circle(screen, self.color, (self.x, self.y), 2)
