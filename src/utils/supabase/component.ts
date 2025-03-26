import { createClient } from './client';

const createComponentClient = () => createClient('browser');

export { createComponentClient };
