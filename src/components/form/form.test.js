import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '.';

beforeAll(() => {
	console.log('Form test starting');
});

beforeEach(() => {
	render(<Form />);
});

const validEmail = 'azaz22155@gmail.com';
const invalidEmail = 'azaz22155gmail.com';
const validPassword = '12345';
const invalidPassword = '1234';

function getInputElement() {
	const emailInputElement = screen.getByRole('textbox', {
		name: /email/i,
	});
	const passwordInputElement = screen.getByLabelText('Password:');
	const confirmPasswordInputElement =
		screen.getByLabelText(/confirm password/i);

	return {
		emailInputElement,
		passwordInputElement,
		confirmPasswordInputElement,
	};
}

const typeIntoForm = ({ email, password, confirmPassword }) => {
	const {
		emailInputElement,
		passwordInputElement,
		confirmPasswordInputElement,
	} = getInputElement();

	if (email) {
		userEvent.type(emailInputElement, email);
	}
	if (password) {
		userEvent.type(passwordInputElement, password);
	}
	if (confirmPassword) {
		userEvent.type(confirmPasswordInputElement, confirmPassword);
	}

	return {
		emailInputElement,
		passwordInputElement,
		confirmPasswordInputElement,
	};
};

const clickSubmitButton = () => {
	const submitButtonElement = screen.getByRole('button', {
		name: /submit/i,
	});
	userEvent.click(submitButtonElement);
};

const getErrorElement = () => {
	const emailErrorElement = screen.queryByText(/Please enter a valid email/i);
	const passwordErrorElement = screen.queryByText(
		/Password must be at least 5 characters/i,
	);
	const confirmPasswordErrorElement = screen.queryByText(
		/Passwords do not match/i,
	);
	return {
		emailErrorElement,
		passwordErrorElement,
		confirmPasswordErrorElement,
	};
};

describe('Rendering', () => {
	test('Error messages should not be render with the form', () => {
		const {
			emailErrorElement,
			passwordErrorElement,
			confirmPasswordErrorElement,
		} = getErrorElement();

		expect(emailErrorElement).not.toBeInTheDocument;
		expect(passwordErrorElement).not.toBeInTheDocument;
		expect(confirmPasswordErrorElement).not.toBeInTheDocument;
	});

	test("Should render 'Email address:' label", () => {
		const { emailInputElement } = getInputElement();
		expect(emailInputElement).toBeInTheDocument();
	});

	test("Should render 'Password:' label", () => {
		const { passwordInputElement } = getInputElement();
		expect(passwordInputElement).toBeInTheDocument();
	});

	test("Should render 'Confirm password:' label", () => {
		const { confirmPasswordInputElement } = getInputElement();
		expect(confirmPasswordInputElement).toBeInTheDocument();
	});

	test('input email should be initially empty', () => {
		const {
			emailInputElement,
			passwordInputElement,
			confirmPasswordInputElement,
		} = getInputElement();
		expect(emailInputElement.value).toBe('');
		expect(passwordInputElement.value).toBe('');
		expect(confirmPasswordInputElement.value).toBe('');
	});
});

describe('Typing in form', () => {
	test('Should be able to type an email', () => {
		const { emailInputElement } = typeIntoForm({
			email: validEmail,
		});
		expect(emailInputElement.value).toBe(validEmail);
	});

	test('Should be able to type a password', () => {
		const { passwordInputElement } = typeIntoForm({
			password: validPassword,
		});
		expect(passwordInputElement.value).toBe(validPassword);
	});

	test('Should be able to type in confirm password', () => {
		const { confirmPasswordInputElement } = typeIntoForm({
			confirmPassword: validPassword,
		});
		expect(confirmPasswordInputElement.value).toBe(validPassword);
	});
});

describe('Error handling', () => {
	test('Should show email error message on invalid email', () => {
		typeIntoForm({
			email: invalidEmail,
		});
		clickSubmitButton();
		const { emailErrorElement } = getErrorElement();

		expect(emailErrorElement).toBeInTheDocument();
	});

	test('Should show password error message if password is less than 5 characters', () => {
		typeIntoForm({
			email: validEmail,
			password: invalidPassword,
		});
		clickSubmitButton();
		const { passwordErrorElement } = getErrorElement();

		expect(passwordErrorElement).toBeInTheDocument();
	});

	test('Should show confirm password error message on invalid confirm password', () => {
		typeIntoForm({
			email: validEmail,
			password: validPassword,
			confirmPassword: invalidPassword,
		});
		clickSubmitButton();
		const { confirmPasswordErrorElement } = getErrorElement();

		expect(confirmPasswordErrorElement).toBeInTheDocument();
	});

	test('Should not show error message on valid inputs', () => {
		typeIntoForm({
			email: validEmail,
			password: validPassword,
			confirmPassword: validPassword,
		});
		clickSubmitButton();
		const {
			emailErrorElement,
			passwordErrorElement,
			confirmPasswordErrorElement,
		} = getErrorElement();

		expect(emailErrorElement).not.toBeInTheDocument();
		expect(passwordErrorElement).not.toBeInTheDocument();
		expect(confirmPasswordErrorElement).not.toBeInTheDocument();
	});
});
