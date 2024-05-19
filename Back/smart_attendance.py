import numpy as np
import face_recognition as face_rec
import cv2
import os
import json
from datetime import datetime

def resize(img, size):
    width = int(img.shape[1] * size)
    height = int(img.shape[0] * size)
    dimension = (width, height)
    return cv2.resize(img, dimension, interpolation=cv2.INTER_AREA)

def findEncoding(images):
    encodeList = []
    for img in images:
        img = resize(img, 0.5)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encodeimg = face_rec.face_encodings(img)[0]
        encodeList.append(encodeimg)
    return encodeList

def markAttendance(name):
    attendance_file = '/Users/alex/Desktop/python-main copy 4/Back/attendance.json'
    
    
    attendance_data = {}
    if os.path.exists(attendance_file):
        try:
            with open(attendance_file, 'r') as f:
                attendance_data = json.load(f)
        except json.JSONDecodeError:
            print("JSONDecodeError: Starting with an empty attendance record.")
    
   
    now = datetime.now()
    timetr = now.strftime("%d-%b-%Y %I:%M:%S %p")
    attendance_data[name] = timetr

    
    with open(attendance_file, 'w') as f:
        json.dump(attendance_data, f, indent=4)

path = '/Users/alex/Desktop/python-main copy 4/Back/images'
studentImages = []
studentNames = []
myList = os.listdir(path)

for cl in myList:
    if cl.lower().endswith(('.png', '.jpg', '.jpeg')):
        curlImg = cv2.imread(f'{path}/{cl}')
        if curlImg is not None:
            studentImages.append(curlImg)
            studentNames.append(os.path.splitext(cl)[0])

encodeList = findEncoding(studentImages)

def recognize_frame():
    frame = cv2.imread('frame.jpg')
    if frame is None:
        print("Failed to load the frame.")
        return

    smaller_frame = cv2.resize(frame, (0, 0), None, 0.25, 0.25)
    facesInFrame = face_rec.face_locations(smaller_frame)
    encodeInFrame = face_rec.face_encodings(smaller_frame, facesInFrame)

    for encodeFace, faceloc in zip(encodeInFrame, facesInFrame):
        matches = face_rec.compare_faces(encodeList, encodeFace)
        faceDist = face_rec.face_distance(encodeList, encodeFace)
        matchIndex = np.argmin(faceDist)

        if matches[matchIndex]:
            name = studentNames[matchIndex].upper()
            y1, x2, y2, x1 = faceloc
            y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 3)
            cv2.rectangle(frame, (x1, y2 - 25), (x2, y2), (0, 255, 0), 3, cv2.FILLED)
            cv2.putText(frame, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
            markAttendance(name)
            print(f"Recognized {name}")

if __name__ == "__main__":
    recognize_frame()