#include <iostream>

using namespace std;

// Single inheritance
class A{
    public:
    int c;
    A(){
        cout << "A's const." << endl;
    }
    ~A(){
        cout << "A's dest." << endl;
    }
};

class B: public A{
    // A obj
    public:
    B(){
        cout << "B's const." << endl;
    }
    ~B(){
        cout << "B's dest." << endl;
    }
};

int main(){
    B obj;
    return 0;
}
