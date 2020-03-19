import streamlit 
import os

def file_selector(folder_path='.'):
    filenames = os.listdir(folder_path)
    selected_filename = streamlit.selectbox('Select a file', filenames)
    return os.path.join(folder_path, selected_filename)

filename = file_selector()
streamlit.write("The sketch is ")
streamlit.image("./results/faces_pretrained/test_latest/images/"+(filename[2:])[:-4]+"_real_A.png")
streamlit.write(" The real life portrait is : ")
streamlit.image("./results/faces_pretrained/test_latest/images/"+(filename[2:])[:-4]+"_fake_B.png")
