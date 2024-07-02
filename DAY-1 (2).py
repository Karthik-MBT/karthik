#!/usr/bin/env python
# coding: utf-8

# In[1]:


2+3


# In[3]:


import numpy as np
size=1000
l1=range(size)
l2=range(size)
a1=np.arange(size)
a2=np.arange(size)

import time 

start=time.time()
result=[(x+y) for x,y in zip(l1,l2)]
print("list took",(time.time()-start)*1000)


# import numpy as np
# a1=np.array([1,2,3,4,5,6,7],dtype=np.float64)
# print(a1)

# In[2]:


import numpy as np
arr=np.array([1,2,3,4,5])
print(arr.dtype)
float_arr=arr.astype(np.float64)
print(float_arr.dtype)


# In[19]:


np.random.random()


# In[21]:


np.random.randn(3,3)


# In[22]:


np.random.randint(low=1,high=5,size=(2,5))


# In[23]:


np.linspace(1,2,1000)


# In[ ]:


a=a.ravel()       #flattening the array


# In[24]:


array=np.array([1,2,3,4,4,5])
counts=np.unique(array)
print(counts)


# In[2]:


import numpy as np
a=np.arange(12).reshape(4,3)
print(a)
print(a.min())
print(a.max())
print(a.sum())
print('column wise sum-',a.sum(axis=0))
print('row wise sum-',a.sum(axis=1))
print(np.sqrt(a))
print(a.mean())


# # pandas

# In[3]:


import pandas as pd
import numpy as np


# In[10]:


l1=[1,2,3,4,5,6,7,8,9,10]
series1=pd.Series(l1)
print(series1)


# In[5]:


l1


# In[12]:


items=[['phone',1300],['tv',1000],['radio',500]]
f=pd.DataFrame(items)
f


# In[14]:


items=[['phone',1300],['tv',1000],['radio',500]]
f=pd.DataFrame(items,index=['nokia','sony','philips'])
f


# In[15]:


#head(8)-is used to print 8 indexes
#head()-is used as default which prints 5 indexes


# # matplotlib
# 

# In[23]:


import matplotlib.pyplot as plt
x=[1,2,3,4,5,6,7]
y=[50,51,52,48,49,55,60]

plt.plot(x,y,'r+--')
plt.grid()


# In[ ]:




