// Teacher was helping us in getting github installed, so he did not teach anything about functions.
// So, I am practising some funcitons

// Problem 01
// This is a function which returns the factorial of the given number
int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

// Problem 02
// This is a function which returns the value when base is power

int power(int base, int exponent) {
    int result = 1;
    for (int i = 0; i < exponent; i++)
        result *= base;
    return result;
}



int main(){
    cout << factorial(5) << endl;
    cout << power(5, 3) << endl;

    return 0;
}
