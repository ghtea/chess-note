import convertCase from './convertCase'


// testTest, TestTest, test_test, TEST_TEST, test-test, TEST-TEST
// type Case = 'camel' | 'pascal' | 'snakeLower' | 'snakeUpper' | 'kebabLower' | 'kebabUpper';


test('test convertCase', () => {
    const value = 'testTest';

    expect(convertCase(value, 'pascal')).toBe('TestTest');
    expect(convertCase(value, 'snakeLower')).toBe('test_test');
    expect(convertCase(value, 'snakeUpper')).toBe('TEST_TEST');
    expect(convertCase(value, 'kebabLower')).toBe('test-test');
    expect(convertCase(value, 'kebabUpper')).toBe('TEST-TEST');

    const value2 = 'test-test'
    expect(convertCase(value2, 'camel')).toBe('testTest');
    
});