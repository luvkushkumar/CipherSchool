#include <iostream>
#include <vector>
using namespace std;

template <typename T1, typename T2>

T1 sum(vector<T1>&v, T1 def = 0){
    T s = def;
    for(T ele:v){
        s+= ele;
    }

    T a;
    for(int i = 0; i < v.size(); i++){
        a = v[i];
        s += a;
        s += v[i];
    }
    return s;
}

double sum(vector<double>&v, int def = 0){
    double s = def;
    for(double ele:v){
        s+= ele;
    }

    return s;
}

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
    vector<int> v = {1,2,3,4,5,6,7,8,9};
    vector<double>v2 = {1.15,2.25,3.35,4.45,5.55,6.65,7.75,8.85,9.95};
    vector<string> vs = {"templates", "are", "magical.!!"};

    Cal<int, int> c1(2,5);





    return 0;
}
