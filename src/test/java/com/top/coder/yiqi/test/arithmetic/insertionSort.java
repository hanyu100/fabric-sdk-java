package com.top.coder.yiqi.test.arithmetic;

/**
 * Author: hanyu
 * Create: 2017/12/26
 * mailto:hanyu100@foxmail.com
 * 插入排序
 */
public class insertionSort {
    //直接插入排序1
    static void insertSort1(Integer[] a){
        for(int j=1;j<a.length;j++){
            Integer key = a[j];
            int i=j-1;
            while (i>=0 && a[i]>key){
                a[i+1]=a[i];
                i = i - 1;
            }
            a[i+1]=key;
        }
    }

    //直接插入排序2
    static void insertSort2(Integer[] a){
        for(int i=1;i<a.length;i++){
            int j=i-1;
            if(a[i]<a[j]){
                int x=a[i];
                a[i]=a[j];
                while (j>=0 && x<a[j]){
                    a[j+1]=a[j];
                    j--;
                }
                a[j+1]=x;
            }
        }
    }
    public static void main(String[] args) {
        Integer[] a = {2,5,4,6,8,7,3,9,10,1,0};
        insertSort2(a);
        for (int x=0;x<a.length;x++){
            System.out.println(a[x]);
        }
    }
}
