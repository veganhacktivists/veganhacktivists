UPDATE "PlaygroundRequest" req
SET "status" = 'Completed'
WHERE
    req."status" = 'Accepted' AND
    EXISTS (
        SELECT 1
        FROM "PlaygroundApplication" AS app
        WHERE
            app."requestId" = req.id AND
            app."status" = 'Accepted'
    );