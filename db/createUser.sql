insert into userinfo (givenname, familyname, email, sub)
values ($1, $2, $3, $4)
returning *;