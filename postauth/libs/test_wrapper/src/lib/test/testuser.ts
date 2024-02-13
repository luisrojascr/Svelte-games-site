import { TestuserLogin } from '$lib/api/api';
import { verifyToken } from '@infinitro/global-postauth';
export async function testUserLogin(userNumber: number) {
	try {
		const result = await TestuserLogin({ variables: { userNumber } });
		if (result?.data?.testuserLogin?.success && result?.data?.testuserLogin?.token) {
			verifyToken(result.data.testuserLogin.token!);
			console.log(result.data.testuserLogin.token);
		} else {
			throw new Error('login failed'); // todo: better error handling
		}
	} catch (e) {
		console.error(e);
	}
}
