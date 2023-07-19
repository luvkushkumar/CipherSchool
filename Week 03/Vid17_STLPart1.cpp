#include <iostream>
#include <vector>
using namespace std;


template <typename A1, typename A2>
class Cal{
    public:
    A1 x;
    A2 y;

    Cal(A1 x, A2 y){
        this->x = x;
        this->y = y;
    }

    A1 sum(){
        return x+y;
    }

    A1 sub(){
        return x-y;
    }
};

int main(){


    Cal<int, int> c1(2,5);





    return 0;
}
