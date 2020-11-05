n = 10
for w in range(n,1920+n,n):
	h=w*9/16
	if h%n==0:print(w,int(h))