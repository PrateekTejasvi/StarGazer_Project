from firebase_admin import credentials,initialize_app,storage
import firebase_admin
cred = credentials.Certificate("stargazer-e1cd8-5e3d2dd93ffb.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'stargazer-e1cd8.appspot.com'
})

def UploadImage(filename):
    bucket=storage.bucket()
    blob = bucket.blob(filename)
    blob.upload_from_filename(filename)
    blob.make_public()

#ensure to get image from firebase front end


