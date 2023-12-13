const admin = require("firebase-admin") ;

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "tubes-pm-11a04",
        "private_key_id": "ffd324019038c99f4e8e7e9a348b09704da064f6",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC140r/Xe4i7Fvq\nF8JPQSOmCxs4ylc4OBmTpWp5zyV2AXHTdPq5tmRoCW1gJaKCtjpk0uS4Eo5ZQ+DW\nXtH09pugpUU5mqAEOedJrpW/0as7htjLvYbcLUAtzRypGou7hT6bQN5gtap1QfkU\nS6BWhRX8naZelSNXA2Z9vAEpwaAmH8iAzrSk33FlZ0b/QDurbIWI/fJvMJcBLnlh\nD1jTA8IXlV14IXrbtURKLweBKqEbhG+r424hO3eQn9Ewo31KcZKxh58ja6np0rGG\nGmeM0Sr292XBes1Jn1uayqGeFePkOfMrPMXRmpRhvDqmQmXqY4jcDV7/PQEg763u\nGHUKdNZzAgMBAAECggEAAPNyY+9Kq4Eh6agPM/VY0QO4jom/0Tn1oEYrbGdCy8L5\nWTOe138FoSIXP+SOtyI84814lqlQw3LVHCnROH8u/bTo6ewCvoTLdCD9mxcyMOAD\nUZKOocWYrU4Jwn/frZ+5IYtCKa44iBuXE7wlfP1f2NGfmg5ny4r2mL85TWRLAS2p\nU8HE2HZ8P4alohYX3fk8n1jlcx315zoF7hVSLdiWcPxFtJaGdNk++KWKToFk8yjF\nQGfffRB4V2HfFYm0IrmSpqqsuuKVfgG90sS7xnLevGH2mWSZrdHnB05obye/zKfr\nvl+J6vSO4yJgTMJrBcRsOuTPyuibD+tG/t9raxoamQKBgQDxQlfCEJRGcT1DzSlZ\npuYtGUnDIPcnR0IYiwFrjx3x4he0842MwXvulMLzEN1gQw0uRTHuKbdZTooe+F+Y\nrJ9Ebxy/Rwojsr71Qmd+vjHeMoE5P8F189EQ9r8m+uhZLVHhB/dC9IXeHYrdEmmC\n/UXh7R1J6IaW3TetxT0sG7gTZQKBgQDBAEsqC3+YM4c9fq0iOHAwiMMw6/Tn1Fjy\nI2RacLlBKvs6+IR4kYv17+5ViUSmnLqhE8HiPRLS0iot5IasyhNgUbAaxeiPT4N9\n1AFYyJpIn4zG5TTIXUg64hTm8fjs5n3xv23m9fOmA/aLtcQ3vX6avirxp8vtf4rt\n5ZGhJJ+g9wKBgQCmtqh78wbzMncabiAf0oQGMA5Xp2UCoGwdF5lQoSIZLpohMZfj\n5yPjtqqMWmAPj+YAzlH1eKA5N1uckRdGIisgmANubgGkr3TjeBKac4V0PMQtMlBW\nWLhkl415uzJpxTZqYR3NB7mlxhZaM8nzeV8cAsUVeHfgslcyXjSqUTE/PQKBgQCH\n+Ef8AAvNU4gUx9j7wd0wJDm3jpSEezKKrGp32PB6u+gw3IKfWpLLGlTDiCiIZOSK\ntJukYriPNCcpG9XRh6/s7L/vrLwxsqgFjsXAIduoDFemjDYKbsWDTmHBbnmblKro\nFKA91croi+Q2+0CYsHSwWgdxJnDiCjf7b/+QEngvcwJ/Vg9mXrVtXL/kR1z0sH6n\nVA/sNOmaxMHghP37vN3y4a9FMSeVMzqTV0cV4FrvVsjhE2FnHB2UzS8VaapGwZql\nDFP34qX9I7t8Bpjmn7yeuZuf09yil4DRa+3xfYnbHy5Rqi13OsSVxFisnXkv+L1o\nGYzqo+iTgZEqEHM2Aa8t3g==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-kajb8@tubes-pm-11a04.iam.gserviceaccount.com",
        "client_id": "114296667441912748037",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kajb8%40tubes-pm-11a04.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      })
});

module.exports = admin