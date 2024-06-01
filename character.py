import pygame

class Character:
    def __init__(self, name, health, attack, defense):
        self.name = name
        self.health = health
        self.attack = attack
        self.defense = defense
        self.level = 1
        self.inventory = []

    def attack_enemy(self, enemy):
        damage = max(0, self.attack - enemy.defense)
        enemy.health -= damage

    def defend(self, damage):
        reduced_damage = max(0, damage - self.defense)
        self.health -= reduced_damage

class Hero(Character):
    def __init__(self, name, health, attack, defense, level):
        super().__init__(name, health, attack, defense)
        self.level = level
        self.rect = pygame.Rect(0, 0, 40, 40)  # Añadir un rectángulo para el héroe

    def collect_item(self, item):
        self.inventory.append(item)

class Enemy(Character):
    def __init__(self, name, health, attack, defense, enemy_type):
        super().__init__(name, health, attack, defense)
        self.type = enemy_type
