import { PrismaClient } from "@prisma/client";

export const wetDBClient = new PrismaClient();

// Middleware is not active in the test environment

/**
 * THE ORDER OF THE MIDDLEWARE MATTERS! - Jordon
 */
