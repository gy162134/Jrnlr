UPDATE post 
SET title = $3,
    subtitle = $4,
    body = $5,
    imageobj = $6,
    privacy = $7
WHERE id = $2;