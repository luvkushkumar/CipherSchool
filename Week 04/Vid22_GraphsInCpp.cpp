#include <iostream>
#include <vector>
#include <bits/stdc++.h>
using namespace std;

void dfs(vector<vector<int>>&g, int s, int v, vector<bool>&visited)
{
    visited[s] = 1;
    cout << s << " ";

    for(int i = 0; i < v; i++){
        if(!visited[i] && g[s][i] == 1){
            dfs(g,i,v,visited);
        }
    }
    return;
}

void print(vector<vector<int>>&g, int v){
    vector<bool>visited(v,0);

    for(int i = 0; i < v; i++){
        if(!visited[i]){
            dfs(g,i,v,visited);
            cout << endl;
        }
    }
    return;
}

int main(){
    int v, e;
    cin >> v >> e;

    vector<vector<int>>g(v,vector<int>(v,0));

    for(int i = 0; i < e; i++){
        int f, s;
        cin >> f>>s;
        g[f][s] = 1;
        g[s][f] == 1;
    }

    print(g,v);

    return 0;
}