# **ProFile** - AI-Powered Resume Builder (Under Development)

## **About the Project**

**ProFile** is an AI-driven resume builder that helps users create professional, job-ready resumes in minutes. The project is currently under development and is designed to offer an intuitive platform where users can log in, build multiple resumes, and receive AI-powered feedback and scoring on how well their resumes match job expectations.

The goal of **ProFile** is to streamline the resume-building process by leveraging artificial intelligence to provide personalized recommendations, score resumes based on their effectiveness, and enable users to download and save multiple versions of their resumes.

### **Features in Development**
- **User Authentication**: Secure login and account management.
- **AI-Powered Resume Building**: Users can create resumes based on input data and AI-generated suggestions.
- **Resume Scoring**: AI analyzes the resume and gives a score based on industry standards.
- **Multiple Resumes**: Users can create and store multiple resumes under their account.
- **Downloadable Resumes**: Users can download their resumes in various formats.

## **Technologies Used**
- **Backend**: Django
- **Frontend**: Currently HTML (to be switched to React in the future)
- **Database**: PostgreSQL
- **AI**: Custom AI algorithms for resume analysis and scoring.
- **Authentication**: OAuth2 / JWT (for secure login)
- **Celery & Redis**: For background task processing (e.g., generating AI feedback or sending email notifications).

## **Installation**

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/profile.git
   ```

2. Navigate into the project directory:
   ```bash
   cd profile
   ```

3. Set up a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run migrations (if using a database):
   ```bash
   python manage.py migrate
   ```

6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

7. Visit the app in your browser at `http://127.0.0.1:8000/`.

## **Project Status**

This project is **currently under development**. New features and improvements will be added in upcoming releases. Stay tuned for updates!

## **Future Enhancements**
- Integration with LinkedIn for automatic profile import.
- Real-time resume suggestions as users build their resumes.
- Enhanced AI scoring system based on different job roles.
- Multi-language support for a wider audience.

## **Contributing**

We welcome contributions! If you'd like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new pull request.

## **License**
This project is licensed under the terms of the [MIT License](https://github.com/Chitresh-code/ProFile/blob/main/LICENSE).

## **Contact**
For inquiries or feedback, feel free to reach out to [contact.profile.app@gmail.com](mailto:contact.profile.app@gmail.com).