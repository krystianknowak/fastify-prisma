import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker'
import { expect, describe, it } from 'bun:test';

const prisma = new PrismaClient();

const getNewProfile = () => ({
    userName: faker.internet.userName(),
    fullName: faker.person.fullName(),
    description: faker.lorem.sentences(1),
    region: faker.location.country(),
    mainUrl: faker.internet.url(),
    avatar: Buffer.from(faker.image.avatar()),
});

const getNewMessage = () => ({
    body: faker.lorem.sentence(1)
});

describe("testing prisma access", () => {
    it("create new profile and messages", async () => {
        // Arrange
        const newProfile = getNewProfile();

        // Act
        const profile = await prisma.profile.create({
            data: {
                ...newProfile, messages: {
                    create: [getNewMessage(), getNewMessage()]
                }
            },
            include: {
                messages: true
            }
        });

        // Assert
        expect(profile.fullName).toBe(newProfile.fullName);
        expect(profile.id).toBeTruthy();
    })
})